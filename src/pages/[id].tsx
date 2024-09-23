import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface FileWithDescription {
  file: File | null;
  description: string;
  fileUrl?: string; // Adicionando a URL para os arquivos temporários
}

const UploadPage = () => {
  const router = useRouter(); // Captura o ID da URL
  const { id } = router.query;
  const [fileData, setFileData] = useState<FileWithDescription[]>([]);
  const [submittedFiles, setSubmittedFiles] = useState<FileWithDescription[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const files = [...fileData];
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      files[index] = {
        ...files[index],
        file: selectedFile,
        fileUrl: URL.createObjectURL(selectedFile), // Gerando a URL para pré-visualização
      };
      setFileData(files);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const files = [...fileData];
    files[index] = {
      ...files[index],
      description: e.target.value,
    };
    setFileData(files);
  };

  const addFileField = () => {
    setFileData([...fileData, { file: null, description: '' }]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedFiles([...submittedFiles, ...fileData]);
    setFileData([]); // Limpa os campos após o envio
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...submittedFiles];
    const fileToRemove = updatedFiles[index];
    
    // Liberando o URL criado para a pré-visualização
    if (fileToRemove.fileUrl) {
      URL.revokeObjectURL(fileToRemove.fileUrl);
    }
    
    updatedFiles.splice(index, 1);
    setSubmittedFiles(updatedFiles);
  };

  const isImageFile = (file: File | null) => {
    return file ? file.type.startsWith('image/') : false;
  };

  useEffect(() => {
    // Limpar URLs criadas para pré-visualização quando o componente for desmontado
    return () => {
      submittedFiles.forEach((fileObj) => {
        if (fileObj.fileUrl) {
          URL.revokeObjectURL(fileObj.fileUrl);
        }
      });
    };
  }, [submittedFiles]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Olá, Seja Bem-Vindo ao Olis</h1>
          <p className="text-xl mb-8">
            Seu organizador online favorito para o dia a dia :D
          </p>
        </div>
      </section>

      {/* Formulário de Upload */}
      <section id="formulario-upload" className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Envio de Documentos, Fotos e etc</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {fileData.map((fileObj, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                  className="w-full text-gray-700 border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="text"
                  placeholder="Descrição do arquivo"
                  value={fileObj.description}
                  onChange={(e) => handleDescriptionChange(e, index)}
                  className="w-full text-gray-700 border border-gray-300 rounded-lg p-3"
                />
              </div>
            ))}
            <div className="flex space-x-4 justify-center">
              <button
                type="button"
                onClick={addFileField}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Adicionar Arquivo
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Seção de Arquivos Enviados */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Arquivos Enviados</h2>
          {submittedFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submittedFiles.map((fileObj, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4">
                  <p><strong>Descrição:</strong> {fileObj.description}</p>
                  {fileObj.file && isImageFile(fileObj.file) ? (
                    <div>
                      <img
                        src={fileObj.fileUrl}
                        alt={fileObj.description}
                        className="mt-4 max-w-full h-auto"
                      />
                      <a
                        href={fileObj.fileUrl}
                        download={fileObj.file.name}
                        className="block mt-2 text-blue-500 underline"
                      >
                        Baixar Imagem
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center mt-4">
                      <span className="text-gray-500">📄 Documento: {fileObj.file?.name}</span>
                      <a
                        href={fileObj.fileUrl}
                        download={fileObj.file?.name}
                        className="ml-4 text-blue-500 underline"
                      >
                        Baixar Documento
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="bg-red-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Nenhum arquivo enviado ainda.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UploadPage;
