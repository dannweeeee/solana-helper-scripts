import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

function generateKeypairFromPrivateKey() {
  try {
    // Get private key from .env file or use the provided one
    const privateKeyString = process.env.PRIVATE_KEY;

    if (!privateKeyString) {
      throw new Error("PRIVATE_KEY is not defined in the .env file");
    }

    const secretKey = bs58.decode(privateKeyString);

    const keypair = Keypair.fromSecretKey(secretKey);

    console.log("Public Key:", keypair.publicKey.toString());

    const keypairJson = {
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey),
    };

    const outputDir = path.join(__dirname, "../keypair");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "keypair.json");
    fs.writeFileSync(outputPath, JSON.stringify(keypairJson, null, 2));

    console.log(`Keypair saved to: ${outputPath}`);

    return keypair;
  } catch (error) {
    console.error("Error generating keypair:", error);
    throw error;
  }
}

generateKeypairFromPrivateKey();
