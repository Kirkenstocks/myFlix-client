import { createRoot } from 'react-dom/client';
import "./index.scss";

const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Hello world</div>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyFlixApplication />);