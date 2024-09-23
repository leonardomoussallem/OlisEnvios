import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';

// Desabilitar o parsing automático do body
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Somente permitir o método POST para o upload de arquivos
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { fields, files } = await parseForm(req);
    
    console.log('Campos recebidos:', fields);
    console.log('Arquivos recebidos:', files);

    res.status(200).json({ message: 'Arquivos recebidos com sucesso', fields, files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar os arquivos' });
  }
};

// Função auxiliar para parsear o formulário usando Promises
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export default handler;
