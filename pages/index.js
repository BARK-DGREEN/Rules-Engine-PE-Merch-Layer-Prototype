import {createCustomObject} from '../lib/client'

export default function Home() {
  const createObject = () => {
    // Logic to grab all form inputs
    const values = {
      test: 'test'
    } 
    const container = 'test-container' // Rules, Messages, Experiences, Collections, etc.
    const key = 'test-key' // UUID of some sort
    createCustomObject(container, key, values)
  }
  
  return (
    <div className="container p-3">
      <button className="btn btn-primary m-3">BarkBox</button>

      <div className="dropdown m-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          id="dropdownMenuButton1"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Option 1
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Option 2
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Option 3
            </a>
          </li>
        </ul>
      </div>
      <button className="btn btn-primary m-3" onClick={createObject}>Create Custom Object</button>
    </div>
  );
}
