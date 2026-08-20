package jayanthi.ai_company_brain.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TextChunkService {

    public List<String> splitIntoChunks(String text) {

        List<String> chunks = new ArrayList<>();

        int chunkSize = 800;

        for (int i = 0; i < text.length(); i += chunkSize) {

            int end = Math.min(i + chunkSize, text.length());

            chunks.add(text.substring(i, end));

        }

        return chunks;
    }
}