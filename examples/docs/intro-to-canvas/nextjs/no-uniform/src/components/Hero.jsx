import Image from "next/image";
import styles from "../../styles/hero.module.css";

const { heroContent, heroWrapper, imageWrapper } = styles;

const IMAGE_URL =
  "https://www.uti.edu/images/default-source/tests/programs/image-test-set-c/uti-technician-training-programs-schools-test-set-c-desktop.webp?sfvrsn=40d531bd_5";

export default () => {
  return (
    <div className={heroWrapper}>
      <div className={imageWrapper}>
        <Image
          priority
          src={IMAGE_URL}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="hero image example"
        />
      </div>

      <div className={heroContent}>
        <h1>Hero Image</h1>
        <p>UTI Hero Content Right Here</p>
      </div>
    </div>
  );
};
