const BounceLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-[10px] w-[10px] animate-bounce rounded-full bg-secondary [animation-delay:-0.3s]"></div>
      <div className="h-[10px] w-[10px] animate-bounce rounded-full bg-secondary [animation-delay:-0.13s]"></div>
      <div className="h-[10px] w-[10px] animate-bounce rounded-full bg-secondary"></div>
    </div>
  );
};

export default BounceLoader;
