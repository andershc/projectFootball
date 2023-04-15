import Image from "next/image";
import LoadingSpinner from "../../public/static/images/loading.gif";

export default function Loading() {
    return (
      <>
        <Image 
          src={LoadingSpinner}
          alt={"/"}
          width={200}
          height={200}
          priority
          />
        <div>Loading...</div>
      </>
    );
  }