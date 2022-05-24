function CaretDownIcon({ isOpen, width, height, fill, isRight }) {
    return (
      <svg
        width={width ? width : "16"}
        height={height ? height : "16"}
        viewBox="0 0 1792 1792"
        transform={isOpen ? "rotate(-180)" : isRight ? "rotate(-90)" : "rotate(0)"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={fill ? fill : "#000"} fillRule="evenodd">
          <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
        </g>
      </svg>
    );
  }
export {CaretDownIcon}