
import React,{useState} from "react";
import Table from 'react-bootstrap/Table';
import './UploadFile.css';
import env from './env.json';

const config = {
    bucketName: env.bucketName,
    region: env.region,
    accessKeyId: env.accessKeyId,
    secretAccessKey: env.secretAccessKey,
}

function UploadFile(props) {
	const [selectedFile, setSelectedFile] = useState(null);
    const [fileDownladableName, setFileDownladableName] = useState(null)
    const handleFileInput = (e) => {
		console.log(" e.target.files[0] ", e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

	const onFormSubmit = async (e) => {
        e.preventDefault()
        if(!selectedFile) {
            return;
        }
		

        console.log(" onSubmit ", selectedFile);
        let tempFileData = selectedFile.name.split('.');
		let fileExtension = tempFileData.pop();
		tempFileData = tempFileData[0].split(' ').join('_'); // Replacing space with _ for name of a file
        const fileName = `${tempFileData}_${new Date().getTime()}`;
        console.log(" fileName ", fileName);
        // return 

        // localStorage.setItem('items', 'sayeed');
        // const items = localStorage.getItem('items');
        
		const {url, fields} = await fetch(`${env.hostName}/api/presigned-url/${fileName}`).then(response => response.json())	
        setFileDownladableName(`${env.hostName}/api/read-s3-data/${fields.key}`)
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
        console.log(" response ", response);
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
            {fileDownladableName && (
                <Table striped bordered hover style={{marginTop:'10px'}}>
                    <tbody style={{textAlign:'center'}}>
                        <tr>
                            <td> 
                                <a href={fileDownladableName}>Click Here to download</a> 
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )}
            
        </div>
  	);
}

export default UploadFile;

