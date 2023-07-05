function ZoomImage(props) {
    return (
      <div
        onClick={props.onClick} // 부모 컴포넌트에서 전달받은 onClick 이벤트를 사용
        style={{
          width: "100%", // 혹은 다른 크기로 설정하시면 됩니다.
          height: "100%", // 혹은 다른 크기로 설정하시면 됩니다.
          position: "absolute",
          overflow: "visible",
        }}
      >
        <img src={props.image} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
  export default ZoomImage;