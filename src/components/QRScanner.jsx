import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";

export default function QRScanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    let scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5, //Fraes per second
    });

    scanner.render(success);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
  }, []);

  return (
    <div>
      <h1>SCAN QR CODE</h1>
      {scanResult ? (
        <div>Success: {scanResult}</div>
      ) : (
        <div id="reader" className="w-96"></div>
      )}
    </div>
  );
}
