import Image from "next/image";

export default function Loading() {
    return (
      <>
        <Image 
          src={"static/images/loading.gif"}
          alt={""}
          width={640}
          height={360}
          />
        <div>Loading...</div>
      </>
    );
  }