import { useState } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { createCustomObject } from '../lib/client'


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function Rules(noDataIndication = null) {
  const [attributes, setAttributes] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [description, setDescription] = useState("");
  const [granularity, setGranularity] = useState("");
  const [highPriority, setHighPriority] = useState(false);
  const [matcher, setMatcher] = useState("");
  const [name, setName] = useState("");
  const [objectType, setObjectType] = useState("");
  const [updatedByUser, setUpdatedByUser] = useState("userIdWhoUpdated")

  const [operationalFields, setOperationalFields] = useState("");

  const createObject = () => {
    // Logic to grab all form inputs
    const values = {
      granularity: granularity,
      object_type: objectType,
      attribute: attributes,
      matcher: matcher,
      attribute_value:attributeValue,
      high_priority: highPriority,
      operational_fields: { 
        name: name,
        desc: description,
        create_dt: new Date(),
        updated_dt: new Date(),
        updated_by: updatedByUser
      }    
  } 

    const container = 'rules'
    const key = crypto.randomUUID() 
    createCustomObject(container, key, values)
  }
  
  return (
    <div className="container p-3 w-50">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Rules</h5>
          <label htmlFor="collectionTitle">Title</label>
          <input type="text" className="form-control" id="collectionTitle" aria-describedby="collectionTitle" placeholder="Enter title" onChange={(e) => setName(e.target.value)}/>
          
          <div style={{margin: "10px 0px", textAlign:"center"}}>          
            <select 
              className="form-select form-select-sm btn btn btn-secondary" 
              aria-label=".form-select-sm" 
              onChange={e => setGranularity(e.target.value)}
              value={granularity}
              style={{width:"250px", display:"inline-block"}}
            >
              <option value="Granularity">Granularity</option>
              <option value="Individual Object Level">Individual Object Level</option>
              <option value="Collection">Collection</option>
            </select>

            <select 
              className="form-select form-select-sm btn btn btn-secondary" 
              aria-label=".form-select-sm" 
              onChange={e => setObjectType(e.target.value)}
              value={objectType}
              style={{margin:"0px 15px", width:"250px"}}
              >
                  <option value="Object Type">Object Type</option>
                  <option value="Customer">Customer</option>
                  <option value="Product">Product</option>
                  <option value="Message">Message</option>
            </select>
            <select 
              className="form-select form-select-sm btn btn btn-secondary" 
              aria-label=".form-select-sm" 
              onChange={e => setMatcher(e.target.value)}
              value={matcher}
              style={{margin:"0 auto", width:"250px"}}
              >
                  <option value="Matcher">Matcher</option>
                  <option value="Greater Than (>)">Greater Than &gt;</option>
                  <option value="Equal To (=)">Equal To =</option>
                  <option value="Less Than (<)">Less Than &lt; </option>
            </select>
          </div>

          <div>
            <label htmlFor="collectionTitle">Attributes</label>
            <input type="text" className="form-control" id="collectionTitle" aria-describedby="collectionTitle" placeholder="Enter attributes" onChange={(e) => setAttributes(e.target.value)}/>
          </div> 

          <label htmlFor="collectionDescription">Description</label>
          <MDEditor value={description} onChange={setDescription} id="collectionDescription"/>

          <div>Does this have a High Priority?</div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={highPriority} onChange={() => setHighPriority(true)} />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={!highPriority} onChange={() => setHighPriority(false)} />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              No
            </label>
          </div>

          <button type="button" className="btn btn-secondary mt-3 float-end text-white" onClick={createObject}>Save</button>
        </div>
      </div>
    </div>
  );
}
