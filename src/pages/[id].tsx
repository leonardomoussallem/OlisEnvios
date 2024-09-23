import { useState, ChangeEvent, FormEvent } from 'react';

interface FileWithDescription {
  file: File | null;
  description: string;
  fileUrl?: string;
}

const UploadPage = () => {
  const [fileData, setFileData] = useState<FileWithDescription[]>([]);

  // Função para atualizar os arquivos
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const files = [...fileData];
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      files[index] = {
        ...files[index],
        file: selectedFile,
        fileUrl: URL.createObjectURL(selectedFile),
        description: selectedFile.name, // Preenche automaticamente a descrição com o nome do arquivo
      };
      setFileData(files);
    }
  };

  // Função para atualizar as descrições
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const files = [...fileData];
    files[index] = {
      ...files[index],
      description: e.target.value,
    };
    setFileData(files);
  };

  // Função para adicionar mais campos
  const addFileField = () => {
    setFileData([...fileData, { file: null, description: '' }]);
  };

  // Função de envio
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Arquivos enviados:', fileData);
    
    // Limpa os campos após o envio
    setFileData([]);
  };

  return (
    <div>
      {/* Header */}
      <header className="w-full max-w-lg p-4 flex justify-start items-center">
        <img src="logo.png" alt="Olis Logo" className="h-10" />
      </header>

      <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 py-6 px-4">
        <div className="bg-white w-full max-w-lg rounded-b-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-black-700 mb-4">Insira seus Documentos</h2>

          {/* Formulário de Upload */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {fileData.map((fileObj, index) => (
              <div key={index} className="space-y-2">
                {/* Título Dinâmico com a contagem de documentos */}
                <label className="block text-lg font-medium text-black-700">
                  Documento {index + 1}
                </label>
                
                {/* Input para selecionar o arquivo */}
                <input
                  type="file"
                  accept="image/*,application/pdf"
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
                <span className="text-sm text-gray-500">
                  {fileObj.file ? fileObj.file.name : 'Nenhum arquivo selecionado'}
                </span>

                {/* Input para adicionar a descrição */}
                <input
                  type="text"
                  placeholder={`Descrição do Documento ${index + 1}`}
                  value={fileObj.description}
                  onChange={(e) => handleDescriptionChange(e, index)}
                  className="w-full text-gray-700 border border-gray-300 rounded-lg p-3"
                />
              </div>
            ))}

            {/* Botão para adicionar mais campos */}
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
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
