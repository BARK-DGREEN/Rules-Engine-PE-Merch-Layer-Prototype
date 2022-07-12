import { useState } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function Experiences() {
  const [description, setDescription] = useState("");
  
  return (
    <div className="container p-3 w-50">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Experiences</h5>
          <label htmlFor="collectionTitle">Title</label>
          <input type="text" className="form-control" id="collectionTitle" aria-describedby="collectionTitle" placeholder="Enter title"/>
          <label htmlFor="collectionDescription">Description</label>
          <MDEditor value={description} onChange={setDescription} id="collectionDescription"/>
          <button type="button" className="btn btn-secondary mt-3 float-end text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
