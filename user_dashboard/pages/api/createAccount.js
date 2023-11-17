import fs from 'fs';
import path from 'path';
import userData from "../db";

const dataFilePath = path.join(process.cwd(), 'pages/db.js');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, phone } = req.body;
    
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUserData = {
      id: userData.length + 1,
      creationDate: new Date().toLocaleDateString(),
      username,
      email,
      password,
      phone,
    };

    userData.push(newUserData);
    fs.writeFileSync(dataFilePath, `const userData = ${JSON.stringify(userData, null, 2)}; export default userData;`);
    res.status(200).json(newUserData);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
