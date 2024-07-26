import { useState } from "react";
import MainPage from "./components/MainPage";
import NFTDetail from "./components/NFTDetail";

export default function App() {
  const [inscription, setInscription] = useState(null);
  const [address, setAddress] = useState(
    "bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs"
  );

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4 place-content-center">
        <MainPage
          onSelect={setInscription}
          showOn={!inscription}
          address={address}
          setAddress={setAddress}
        />
        {inscription && (
          <NFTDetail
            inscription={inscription}
            setInscription={setInscription}
            address={address}
          />
        )}
      </div>
    </div>
  );
}
