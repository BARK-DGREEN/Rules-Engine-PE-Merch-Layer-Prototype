import { useState, useEffect } from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { createCustomObject, getCustomObjectsByContainer } from '../lib/client'

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function Experiences() {
  const [assigneeType, setAssigneeType] = useState("");
  const [collections, setCollections] = useState([]);
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [granularity, setGranularity] = useState("");
  const [highPriority, setHighPriority] = useState(false);
  const [name, setName] = useState("");
  const [objectId, setObjectId] = useState("");
  const [objectType, setObjectType] = useState("");
  const [rules, setRules] = useState([]);
  const [ruleIds, setRuleIds] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [updatedByUser, setUpdatedByUser] = useState("userIdWhoUpdated");

  useEffect(() => {
    const getRules = async () => {
      const rules = await getCustomObjectsByContainer('/rules');
      console.log(rules);
      setRules(rules);
    }
    getRules();

    const getCollectionObjects = async() => {
      const collections = await getCustomObjectsByContainer('/collections');
      console.log(collections);
      setCollections(collections);
    }
    getCollectionObjects()
  }, [setRules, setCollections])

  const createObject = () => {
    const values = {
      granularity: granularity,
      object_type: objectType,
      assignee_type: assigneeType,
      object_id: objectId,
      rule_ids: ruleIds,
      start_dt: startDate,
      end_dt: endDate,
      high_priority: highPriority,
      operational_fields: { 
        name: name,
        desc: description,
        create_dt: new Date(),
        updated_dt: new Date(),
        updated_by: updatedByUser
      }    
  } 

    const container = 'experiences'
    const key = crypto.randomUUID() 
    createCustomObject(container, key, values)
  }
  
  return (
    <div className="container p-3 w-50">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Experiences</h5>
          <label htmlFor="collectionTitle">Name</label>
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
              onChange={e => setObjectId(e.target.value)}
              value={objectId}
              style={{width:"250px", margin:"0px 15px", display:"inline-block"}}
            >
              <option value="Granularity">Collection to Target</option>
              { collections ? 
                collections.map((collection) => {
                  <option value={collection.id}>{collection.key}</option>
                })
              : null}
            </select>
          </div>

          <div style={{margin: "10px 0px", textAlign:"center"}}>      
            <select 
              className="form-select form-select-sm btn btn btn-secondary" 
              aria-label=".form-select-sm" 
              onChange={e => setObjectType(e.target.value)}
              value={objectType}
              style={{ width:"250px"}}
            >
              <option value="Object Type">Object Type</option>
              <option value="Feature">Feature</option>
              <option value="Message">Message</option>
              <option value="Product">Product</option>
            </select>    
            <select 
              className="form-select form-select-sm btn btn btn-secondary" 
              aria-label=".form-select-sm" 
              onChange={e => setAssigneeType(e.target.value)}
              value={objectType}
              style={{margin:"0px 15px", width:"250px"}}
            >
              <option value="Object Type">Assignee Type</option>
              <option value="Subscription">Subscription</option>
              <option value="Customer">Customer</option>
            </select>


          </div>
          <div style={{margin: "10px 0px", textAlign:"center"}}>          
            <select 
              className="form-select form-select-sm btn btn btn-secondary" 
              aria-label=".form-select-sm" 
              onChange={e => setRuleIds(...ruleIds, e.target.value)}
              value={objectType}
              style={{margin:"0px 15px", width:"250px"}}
            >
              <option value="Object Type">Rules</option>
              { rules ? 
                rules.map((rule) => {
                  <option value={rule.id}>{rule.key}</option>
                })
              : null}
            </select>
          </div>

          <label htmlFor="collectionTitle">Start Date</label>
          <input type="date" className="form-control" id="collectionTitle" aria-describedby="collectionTitle" placeholder="Enter title" onChange={(e) => setStartDate(e.target.value)}/>

          <label htmlFor="collectionTitle">End Date</label>
          <input type="date" className="form-control" id="collectionTitle" aria-describedby="collectionTitle" placeholder="Enter title" onChange={(e) => setEndDate(e.target.value)}/>

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
