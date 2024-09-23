import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface FileWithDescription {
  file: File | null;
  description: string;
  fileUrl?: string;
}

const UploadPage = () => {
  const router = useRouter();
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
        fileUrl: URL.createObjectURL(selectedFile),
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
    return () => {
      submittedFiles.forEach((fileObj) => {
        if (fileObj.fileUrl) {
          URL.revokeObjectURL(fileObj.fileUrl);
        }
      });
    };
  }, [submittedFiles]);

  return (
    <div>
      <header className="w-full max-w-lg p-4 flex justify-start items-center">
  <img src="logo.png" alt="Olis Logo" className="h-10" />
</header>

    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 py-6 px-4">
      {/* Header */}
      

      <div className="bg-white w-full max-w-lg rounded-b-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Insira seus Documentos.</h2>
        {/* Formulário de Upload */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {fileData.map((fileObj, index) => (
            <div key={index} className="space-y-2">
              <input
                type="file"
                id={`file-upload-${index}`}
                onChange={(e) => handleFileChange(e, index)}
                className="hidden"
              />
              <label
                htmlFor={`file-upload-${index}`}
                className="cursor-pointer bg-purple-300 hover:bg-purple-400 text-purple-800 py-2 px-4 rounded-md inline-block font-bold"
              >
                Escolher Arquivo
              </label>
              <span className="text-sm text-gray-500">Nenhum arquivo selecionado</span>

              <input
                type="text"
                placeholder="Descrição do arquivo"
                value={fileObj.description}
                onChange={(e) => handleDescriptionChange(e, index)}
                className="w-full text-gray-700 border border-gray-300 rounded-lg p-3"
              />
            </div>
          ))}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={addFileField}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Adicionar Documento
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
        </form>

        {/* Seção de Arquivos Enviados */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Arquivos Enviados</h2>
          {submittedFiles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {submittedFiles.map((fileObj, index) => (
                <div key={index} className="bg-white p-4 border rounded-lg shadow-sm">
                  <p><strong>Descrição:</strong> {fileObj.description}</p>
                  {fileObj.file && isImageFile(fileObj.file) ? (
                    <div className="mt-4">
                      <img
                        src={fileObj.fileUrl}
                        alt={fileObj.description}
                        className="w-full h-auto"
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
                    <div className="mt-4 flex items-center">
                      <span className="text-gray-600">📄 Documento: {fileObj.file?.name}</span>
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
            <p className="text-center text-gray-500">Nenhum arquivo enviado ainda.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UploadPage;
