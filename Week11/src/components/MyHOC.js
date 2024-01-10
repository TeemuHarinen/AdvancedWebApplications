
//orginal hoc file
const MyHOC = (WrappedComponent, {name}) => {
    return (
      <div className="wrapper">
        <WrappedComponent name={name} />
      </div>
    );
  };

  export default MyHOC;