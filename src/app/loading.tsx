import Image from "next/image";

export default function Loading() {
    return (
      <>
        <Image 
          src={"static/images/tail-spin.svg"}
          alt={""}
          width={640}
          height={360}
          />
        <div>Loading...</div>
      </>
    );
  }