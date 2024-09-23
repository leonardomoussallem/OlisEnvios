import { useState, ChangeEvent, FormEvent } from 'react';

interface FileWithDescription {
  file: File | null;
  description: string;
  fileUrl?: string;
}

const UploadPage = () => {
  const [rgFile, setRgFile] = useState<FileWithDescription>({ file: null, description: '' });
  const [cpfFile, setCpfFile] = useState<FileWithDescription>({ file: null, description: '' });
  const [certidaoFile, setCertidaoFile] = useState<FileWithDescription>({ file: null, description: '' });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: (file: FileWithDescription) => void) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile({
        file: selectedFile,
        fileUrl: URL.createObjectURL(selectedFile),
        description: selectedFile.name, // Preenche automaticamente a descrição com o nome do arquivo
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os arquivos (rgFile, cpfFile, certidaoFile) para o backend
    console.log('Arquivos enviados:', { rgFile, cpfFile, certidaoFile });

    // Limpar os arquivos selecionados após o envio
    setRgFile({ file: null, description: '' });
    setCpfFile({ file: null, description: '' });
    setCertidaoFile({ file: null, description: '' });
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
            {/* Campo para RG */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-black-700">Selecionar RG</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                id="file-upload-rg"
                onChange={(e) => handleFileChange(e, setRgFile)}
                className="hidden"
              />
              <label
                htmlFor="file-upload-rg"
                className="cursor-pointer bg-purple-300 hover:bg-purple-400 text-purple-800 py-2 px-4 rounded-md inline-block font-bold"
              >
                Escolher Arquivo
              </label>
              <span className="text-sm text-gray-500">{rgFile.file ? rgFile.file.name : 'Nenhum arquivo selecionado'}</span>
            </div>

            {/* Campo para CPF */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-black-700">Selecionar CPF</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                id="file-upload-cpf"
                onChange={(e) => handleFileChange(e, setCpfFile)}
                className="hidden"
              />
              <label
                htmlFor="file-upload-cpf"
                className="cursor-pointer bg-purple-300 hover:bg-purple-400 text-purple-800 py-2 px-4 rounded-md inline-block font-bold"
              >
                Escolher Arquivo
              </label>
              <span className="text-sm text-gray-500">{cpfFile.file ? cpfFile.file.name : 'Nenhum arquivo selecionado'}</span>
            </div>

            {/* Campo para Certidão */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-black-700">Selecionar Certidão</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                id="file-upload-certidao"
                onChange={(e) => handleFileChange(e, setCertidaoFile)}
                className="hidden"
              />
              <label
                htmlFor="file-upload-certidao"
                className="cursor-pointer bg-purple-300 hover:bg-purple-400 text-purple-800 py-2 px-4 rounded-md inline-block font-bold"
              >
                Escolher Arquivo
              </label>
              <span className="text-sm text-gray-500">{certidaoFile.file ? certidaoFile.file.name : 'Nenhum arquivo selecionado'}</span>
            </div>

            <div className="flex justify-between">
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
