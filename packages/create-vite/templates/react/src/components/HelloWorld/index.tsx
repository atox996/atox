interface IProps {
  msg: string;
}

const HelloWorld = (props: IProps) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{props.msg}</h1>

      <div className="card">
        <button type="button" onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit
          <code>components/HelloWorld.vue</code> to test HMR
        </p>
      </div>

      <p>
        Check out
        <a
          href="https://vuejs.org/guide/quick-start.html#local"
          target="_blank"
        >
          create-vue
        </a>
        , the official Vue + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
        >
          Vue Docs Scaling up Guide
        </a>
        .
      </p>
      <p className="read-the-docs">
        Click on the Vite and Vue logos to learn more
      </p>
    </>
  );
};

export default HelloWorld;
