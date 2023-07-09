import {FidgetSpinner} from "react-loader-spinner";

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-full w-full">
        <FidgetSpinner
            visible={true}
            height="280"
            width="280"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor="#F4442E"
        />
    </div>
  );
}

export default LoadingScreen;
