from docx import Document

# Load the Word file
doc = Document("C:/Users/DIMAS ANGGORO SAKTI/Dropbox/My PC (LAPTOP-FMDVD92V)/Downloads/ExoPlanetService/frontend/Skripsi 2110511115_Dimas Anggoro Sakti (1).docx")

# Save the content to a text file
with open("output.txt", "w", encoding="utf-8") as f:
    for paragraph in doc.paragraphs:
        f.write(paragraph.text + "\n")

print("Isi file telah disimpan ke 'output.txt'")