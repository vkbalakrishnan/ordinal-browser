const RenderContent = ({ inscription, rawContent }) => {
  if (!inscription.id || !rawContent) return;
  if (rawContent && inscription.id && !inscription.content_type) {
    return (
      <div className="p-8 mb-4 bg-gray-800 text-teal-600 font-light text-wrap break-words">
        {rawContent}
      </div>
    );
  } else if (inscription?.content_type?.startsWith("image/svg")) {
    return (
      <img
        className="w-full"
        src={`data:image/svg+xml;utf8,${encodeURIComponent(rawContent)}`}
        alt={`svg image for inscription`}
      />
    );
  } else if (inscription?.content_type?.startsWith("image")) {
    return (
      <img
        className="w-full"
        src={`https://ord.xverse.app/content/${inscription.id}`}
        alt={`content for inscription`}
      />
    );
  }
  // if (!inscription.content_type) return null;
  return (
    <div className="p-8 mb-4 bg-gray-800 text-teal-600 font-light text-wrap break-words">
      {rawContent}
    </div>
  );
};
export default RenderContent;
