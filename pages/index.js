import {useState, useEffect} from 'react'
import { getCarts } from '../lib/client'

export default function Home() {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    const data = getCarts();
    console.log(data)
    setCarts(data)
  }, [setCarts])
  
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
    </div>
  );
}
