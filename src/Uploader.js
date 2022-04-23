
import React,{useState} from "react";
// import Table from 'react-bootstrap/Table';
// import { uploadFile } from 'react-s3'; 
import { useDispatch, useSelector } from "react-redux";
import { portfolios } from "./store/financierDashboard";
// import { privateBucketData } from "./store/uploadFile";
// import './UploadFile.css';
// window.Buffer = window.Buffer || require("buffer").Buffer;


// import { PersistGate } from "redux-persist/integration/react";

const S3_BUCKET ='acennadevtestbucket';
// const S3_BUCKET ='acennatestbucket';
const REGION ='ap-south-1';
const ACCESS_KEY ='AKIAWKPPZCPB4N7VL3Z3';
const SECRET_ACCESS_KEY ='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';

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }

const config = {
    bucketName: 'fileuploadsayeed',
    region: 'ap-south-1',
    accessKeyId: 'AKIA4BQMUAZRZ742TBLR',
    secretAccessKey: '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',
}

function Uploader(props) {
	const [selectedFile, setSelectedFile] = useState(null);
	const dispatch = useDispatch();
	const fileNames = useSelector(state => state.entities);
	console.log(" fileNames ===== ", fileNames);





    const handleFileInput = (e) => {
		console.log(" e.target.files[0] ", e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    const handleUploadInPublicBucket = async(file) => {
		console.log(" file ",file.type);
		let tempFileData = file.name.split('.');
		let fileExtension = tempFileData.pop();
		tempFileData = tempFileData[0].split(' ').join('_'); // Replacing space with _ for name of a file
        const fileName = `${tempFileData}_${new Date().getTime()}.${fileExtension}`;
        var renamedFile = new File([file], fileName);
        console.log(" renamedFile ", renamedFile);
		// const {url, fields} = await fetch("http://localhost:8080/get-signed-url").then(response => response.json())
		const {url, fields} = await fetch("http://localhost:3001/beta/api/presigned-url").then(response => response.json())
		console.log(" url ", url);
		console.log(" fields ", fields);

		const data = {
			bucket: "fileuploadsayeed",
			...fields,
			'Content-Type': file.type,
			file: file,
		};

		const response = await fetch(url, {
			method: 'POST',
			body: data,
		});
		console.log(" response ", response);
		
    }

	const onFormSubmit = async (e) => {
        console.log(" onSubmit ");
		e.preventDefault()
        dispatch(portfolios('test'));
        // dispatch(privateBucketData('test'))
		return;
		const {url, fields} = await fetch("http://localhost:3001/beta/api/presigned-url").then(response => response.json())	
		const config = {     
			headers: { 'content-type': 'multipart/form-data' }
		}
		
		const data = {
			bucket: "fileuploadsayeed",
			...fields,
			// 'Content-Type': selectedFile.type,
			file: selectedFile,
		};

		const formData  = new FormData();
		for (const name in data) {
			formData.append(name, data[name]);
		}
		const response = await fetch(url, {
			method: 'POST',
			body: formData,
		});
	}

	const downLoadImage = async () => {

	}

	
	
	

  	return (
		<div className="center">
            <div style={{}}>
                <form onSubmit={onFormSubmit} >
                    <h1>File Upload</h1>
                    <input type="file" onChange={handleFileInput} />
                    <button type="submit">Upload</button>
                </form>
            </div>
            {/* {fileNames && fileNames.map((file)=>{ */}
                {/* <Table striped bordered hover style={{marginTop:'10px'}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>File Name</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table> */}
            {/* })} */}
            
        </div>
  	);
}

export default Uploader;

