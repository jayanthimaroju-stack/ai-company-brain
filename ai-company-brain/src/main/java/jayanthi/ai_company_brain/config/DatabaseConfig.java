package jayanthi.ai_company_brain.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Value("${DATABASE_USERNAME:postgres}")
    private String defaultUsername;

    @Value("${DATABASE_PASSWORD:postgres}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setDriverClassName("org.postgresql.Driver");

        if (databaseUrl != null && !databaseUrl.isBlank()) {
            String cleanUrl = databaseUrl.trim();

            if (cleanUrl.startsWith("postgres://") || cleanUrl.startsWith("postgresql://")) {
                try {
                    URI uri = new URI(cleanUrl);
                    String userInfo = uri.getUserInfo();
                    String username = defaultUsername;
                    String password = defaultPassword;

                    if (userInfo != null && userInfo.contains(":")) {
                        String[] parts = userInfo.split(":", 2);
                        username = parts[0];
                        password = parts[1];
                    } else if (userInfo != null) {
                        username = userInfo;
                    }

                    int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                    String host = uri.getHost();
                    String path = uri.getPath();
                    String query = uri.getQuery();

                    StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                            .append(host)
                            .append(":")
                            .append(port)
                            .append(path);

                    if (query != null && !query.isBlank()) {
                        jdbcUrl.append("?").append(query);
                    } else if (cleanUrl.contains("render.com") || cleanUrl.contains("neon.tech") || cleanUrl.contains("supabase.co") || cleanUrl.contains("railway.app")) {
                        jdbcUrl.append("?sslmode=require");
                    }

                    log.info("Connecting to PostgreSQL at host: {}, port: {}, database: {}", host, port, path);
                    config.setJdbcUrl(jdbcUrl.toString());
                    config.setUsername(username);
                    config.setPassword(password);
                    return new HikariDataSource(config);
                } catch (Exception e) {
                    log.warn("Could not parse DATABASE_URL as URI, falling back to raw JDBC formatting: {}", e.getMessage());
                }
            }

            if (!cleanUrl.startsWith("jdbc:")) {
                cleanUrl = "jdbc:" + cleanUrl;
            }
            config.setJdbcUrl(cleanUrl);
            config.setUsername(defaultUsername);
            config.setPassword(defaultPassword);
        } else {
            config.setJdbcUrl("jdbc:postgresql://localhost:5433/companybrain");
            config.setUsername(defaultUsername);
            config.setPassword(defaultPassword);
        }

        return new HikariDataSource(config);
    }
}
