interface IProps {
  msg: string;
}

const HelloWorld = (props: IProps) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{props.msg}</h1>

      <button type="button" onClick={() => setCount(count + 1)}>
        count is {count}
      </button>

      <p>
        Check out
        <a
          href="https://www.npmjs.com/package/@atox/create-vite"
          target="_blank"
        >
          @atox/create-vite
        </a>
        , Vite template starter
      </p>
    </>
  );
};

export default HelloWorld;
