import ClipLoader from "react-spinners/ClipLoader";
export default  spinning()
{
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#3b82f6" size={60} />
    </div>
  );
}
}
