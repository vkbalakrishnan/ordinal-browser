import { useEffect, useState } from "react";

const getInscriptionAPI = (address, inscriptionId) =>
  `https://api-3.xverse.app/v1/address/${address}/ordinals/inscriptions/${inscriptionId}`;

const getContent = async (inscriptionId) => {
  const response = await fetch(
    `https://ord.xverse.app/content/${inscriptionId}`
  );
  const data = await response.text();
  return data;
};
const NFTDetail = ({ address, inscription, setInscription }) => {
  const inscriptionId = inscription.id;
  const [content, setContent] = useState({});
  const [rawContent, setRawContent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getInscriptionAPI(address, inscriptionId));
      setContent(await response.json());

      const inscriptionContent = await getContent(inscriptionId);
      setRawContent(inscriptionContent);
    };

    fetchData().catch(console.error);
  }, [address, inscriptionId, setInscription]);

  const resetInscription = () => {
    setInscription(null);
  };

  if (!content.content_type || typeof rawContent !== "string") return;
  return (
    <div className="my-8">
      <div className="text-center  mb-8">
        <h1>
          <span
            className="float-left cursor-pointer p-2"
            onClick={resetInscription}
          >
            {"<"}
          </span>
          Details
        </h1>
      </div>
      <div>
        <div>
          {content.content_type.startsWith("image") && (
            <img
              className="w-full"
              src={`https://ord.xverse.app/content/${inscriptionId}`}
              alt={`content for inscription`}
            />
          )}

          {!content.content_type.startsWith("image") && (
            <div className="p-8 mb-4 bg-gray-800 text-teal-600 font-light text-wrap break-words">
              {rawContent}
            </div>
          )}
          <a
            className="underline float-end"
            href={`https://ord.xverse.app/content/${inscriptionId}`}
            target="_blank"
          >
            {" "}
            View in a new tab{" "}
          </a>
        </div>
        <ul className="nft-content mt-2">
          <li className="mb-2">
            <label>Inscription ID</label>
            <p className="text-wrap break-all	">{inscriptionId}</p>
          </li>
          <li className="mb-2">
            <label>Owner Address</label>
            <p className="text-wrap break-all	">{address}</p>
          </li>
          <li className="mb-2">
            <label className="mb-2">Attributes</label>
            <ul className=" attributes px-8">
              <li>
                Output value
                <p>{content.value}</p>
              </li>
              <li>
                Content Type
                <p>{content.content_type}</p>
              </li>
              <li>
                Content Length
                <p>{content.content_length}</p>
              </li>
              <li>
                Location
                <p>{content.location}</p>
              </li>
              <li>
                Genesis Transaction
                <p>{content.genesis_tx_id}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NFTDetail;
