import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

// Desabilitar o parsing automático do body
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao processar os arquivos' });
      return;
    }
    console.log(fields, files); // Processa os arquivos recebidos
    res.status(200).json({ message: 'Arquivos recebidos com sucesso' });
  });
};

export default handler;
