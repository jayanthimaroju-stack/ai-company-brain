package jayanthi.ai_company_brain.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VectorStoreService {

    private final VectorStore vectorStore;

    public VectorStoreService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    // Save document chunks to PGVector
    public void saveChunks(List<String> chunks, String filename) {

        if (chunks == null || chunks.isEmpty()) {
            System.out.println("No chunks found to store");
            return;
        }

        List<Document> documents = chunks.stream()
                .map(chunk -> {

                    Document document = new Document(chunk);

                    // Store original filename as metadata
                    document.getMetadata().put("filename", filename);

                    return document;
                })
                .toList();

        vectorStore.add(documents);

        System.out.println(
                "Successfully stored "
                        + documents.size()
                        + " chunks for "
                        + filename
                        + " into vector_store"
        );
    }

    // Search similar document chunks
    public String search(String question) {

        if (question == null || question.trim().isEmpty()) {
            return "";
        }

        SearchRequest request = SearchRequest.builder()
                .query(question)
                .topK(3)
                .similarityThreshold(0.3)
                .build();

        List<Document> documents =
                vectorStore.similaritySearch(request);

        if (documents == null || documents.isEmpty()) {

            System.out.println(
                    "No sufficiently relevant documents found"
            );

            return "";
        }

        StringBuilder context = new StringBuilder();

        for (Document document : documents) {

            String filename =
                    (String) document.getMetadata().get("filename");

            context.append("Source: ")
                    .append(
                            filename != null
                                    ? filename
                                    : "Unknown"
                    )
                    .append("\n");

            context.append(document.getText())
                    .append("\n\n");
        }

        System.out.println(
                "Found "
                        + documents.size()
                        + " relevant documents"
        );

        return context.toString();
    }
}
