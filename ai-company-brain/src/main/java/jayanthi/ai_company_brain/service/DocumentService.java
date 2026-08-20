package jayanthi.ai_company_brain.service;

import jayanthi.ai_company_brain.entity.DocumentEntity;
import jayanthi.ai_company_brain.repository.DocumentRepository;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class DocumentService {

    private static final String UPLOAD_DIR = "uploads";

    private final TextChunkService textChunkService;
    private final VectorStoreService vectorStoreService;
    private final DocumentRepository documentRepository;

    public DocumentService(
            TextChunkService textChunkService,
            VectorStoreService vectorStoreService,
            DocumentRepository documentRepository) {

        this.textChunkService = textChunkService;
        this.vectorStoreService = vectorStoreService;
        this.documentRepository = documentRepository;
    }

    public void uploadDocument(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        try {

            // ---------------------------------------
            // 1. Create upload directory
            // ---------------------------------------

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // ---------------------------------------
            // 2. Get filename
            // ---------------------------------------

            String filename = file.getOriginalFilename();

            if (filename == null || filename.trim().isEmpty()) {
                filename =
                        "uploaded_doc_" +
                                System.currentTimeMillis();
            }

            Path filePath = uploadPath.resolve(filename);

            // ---------------------------------------
            // 3. Save uploaded file
            // ---------------------------------------

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            System.out.println(
                    "File uploaded: " + filename
            );

            // ---------------------------------------
            // 4. Extract text
            // ---------------------------------------

            String text;

            if (filename.toLowerCase().endsWith(".pdf")) {

                text = extractPdfText(filePath);

            } else {

                // Support TXT, MD, JSON and CSV
                text = Files.readString(
                        filePath,
                        StandardCharsets.UTF_8
                );
            }

            // ---------------------------------------
            // 5. Validate extracted text
            // ---------------------------------------

            if (text == null || text.trim().isEmpty()) {

                throw new IllegalStateException(
                        "Could not extract any readable text from document: "
                                + filename
                                + ". The PDF may be scanned/image-based."
                );
            }

            System.out.println(
                    "Extracted "
                            + text.length()
                            + " characters from "
                            + filename
            );

            // ---------------------------------------
            // 6. Split into chunks
            // ---------------------------------------

            List<String> chunks =
                    textChunkService.splitIntoChunks(text);

            if (chunks == null || chunks.isEmpty()) {

                throw new IllegalStateException(
                        "No chunks were created from document: "
                                + filename
                );
            }

            System.out.println(
                    "Created "
                            + chunks.size()
                            + " chunks for "
                            + filename
            );

            // ---------------------------------------
            // 7. Store in PGVector
            // ---------------------------------------

            vectorStoreService.saveChunks(
                    chunks,
                    filename
            );

            // ---------------------------------------
            // 8. Save document metadata to database
            // ---------------------------------------

            documentRepository.save(new DocumentEntity(filename));

            System.out.println(
                    "Successfully processed and stored "
                            + chunks.size()
                            + " chunks for: "
                            + filename
            );

        } catch (Exception e) {

            System.err.println(
                    "Document upload processing failed: "
                            + e.getMessage()
            );

            e.printStackTrace();

            throw new RuntimeException(
                    "Failed to upload and index document: "
                            + e.getMessage(),
                    e
            );
        }
    }


    // ============================================
    // PDF TEXT EXTRACTION
    // ============================================

    private String extractPdfText(Path filePath)
            throws Exception {

        StringBuilder extractedText =
                new StringBuilder();

        try (
                PDDocument document =
                        Loader.loadPDF(
                                new File(
                                        filePath.toString()
                                )
                        )
        ) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            int totalPages =
                    document.getNumberOfPages();

            System.out.println(
                    "PDF pages: " + totalPages
            );

            // Extract page by page
            for (int page = 1; page <= totalPages; page++) {

                stripper.setStartPage(page);
                stripper.setEndPage(page);

                String pageText =
                        stripper.getText(document);

                if (pageText != null &&
                        !pageText.trim().isEmpty()) {

                    extractedText
                            .append(pageText)
                            .append("\n\n");
                }
            }
        }

        return extractedText.toString().trim();
    }
}