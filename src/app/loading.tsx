import Image from "next/image";
import LoadingSpinner from "../../public/static/images/tail-spin.svg";

export default function Loading() {
    return (
      <>
        <Image 
          src={LoadingSpinner}
          alt={"/"}
          width={50}
          height={50}
          priority
          />
        <div>Loading...</div>
      </>
    );
  }