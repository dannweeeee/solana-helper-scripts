import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

function generatePrivateKeyFromKeypair() {
  try {
    // Get keypair array from .env file
    const keypairArray = process.env.KEYPAIR;

    if (!keypairArray) {
      throw new Error("KEYPAIR is not defined in the .env file");
    }

    const secretKey = JSON.parse(keypairArray);

    const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));

    console.log("Public Key:", keypair.publicKey.toString());

    const privateKey = bs58.encode(keypair.secretKey);
    console.log("Private Key:", privateKey);

    const privateKeyJson = {
      publicKey: keypair.publicKey.toString(),
      privateKey: privateKey,
      secretKey: Array.from(keypair.secretKey),
    };

    const outputDir = path.join(__dirname, "../privateKey");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "privateKey.json");
    fs.writeFileSync(outputPath, JSON.stringify(privateKeyJson, null, 2));

    console.log(`Private key information saved to: ${outputPath}`);

    return keypair;
  } catch (error) {
    console.error("Error generating keypair:", error);
    throw error;
  }
}

generatePrivateKeyFromKeypair();
