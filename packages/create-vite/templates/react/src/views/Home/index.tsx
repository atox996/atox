import classNames from "classnames";
import styles from "./index.module.less";
import HelloWorld from "@/components/HelloWorld";
import ReactSvg from "@/assets/react.svg";

const Home = () => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="/vite.svg"
            className={classNames(styles["logo"])}
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev/" target="_blank">
          <img
            src={ReactSvg}
            className={classNames(styles["logo"], styles["react"])}
            alt="React logo"
          />
        </a>
      </div>
      <HelloWorld msg="Vite + React" />
    </>
  );
};

export default Home;
