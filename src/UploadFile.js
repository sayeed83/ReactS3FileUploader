// https://docs.aws.amazon.com/directconnect/latest/APIReference/CommonParameters.html

import React,{useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import './UploadFile.css';
import env from './env.json';
// import axios from "axios";

const config = {
    bucketName: env.bucketName,
    region: env.region,
    accessKeyId: env.accessKeyId,
    secretAccessKey: env.secretAccessKey,
}

function UploadFile(props) {
    
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileData, setFileData] = useState([]);
    const [fileDownladableName, setFileDownladableName] = useState(null)
    
    useEffect(()=>{
        getFileData();
    },[])

    const getFileData = async () => {
        const fileResponse = await fetch(`http://localhost:3001/api/get-all-files`).then(response => response.json())
        if(fileResponse.status == 'success') {
            setFileData(fileResponse.data)
        }
    }

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
        const fileName = `${tempFileData}_${new Date().getTime()}.${fileExtension}`;
        console.log(" fileName ", fileName);
        // localStorage.setItem('items', 'sayeed');
        // const items = localStorage.getItem('items');
        
        const signedUrlResult = await fetch(`http://localhost:3001/api/get-presigned-url?fileName=${fileName}`).then(response => response.json())	
        console.log(" signedUrlResult ", signedUrlResult)
        if(signedUrlResult.status == 'success') {
            const fields = signedUrlResult.data.fields;
            const url = signedUrlResult.data.url;
            setFileDownladableName(`http://localhost:3001/api/read-s3-data?fileName=${fields.key}`)
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

            console.log(" response======  ", response)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: fields.key })
            };
            fetch('http://localhost:3001/api/add-file', requestOptions)
            .then(response => {
                getFileData();
                // console.log("response ", response);
                // console.log("response.data ", response.data);
                // let temp = fileData;
                // if(response.status == 'success') {
                //     let newData = [response.data,...temp]
                //     console.log(newData);
                //     setFileData(newData)
                // }
            })

        }
                                         
	}

  	return (
		<div className="center">
            <div style={{}}>
                <form onSubmit={onFormSubmit} >
                    <h1>File Upload</h1>
                    <div style={{display:'flex'}}>
                        
                        <input type="file" onChange={handleFileInput} />
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
            
            {fileData.length > 0 && (
                <Table striped bordered hover style={{marginTop:'10px'}}>
                    <thead style={{textAlign:'center'}}>
                        <tr>
                            <th>FileName</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {fileData.map((file,index)=>{
                        return(
                            <tbody  key={index} style={{textAlign:'center'}}>
                                <tr>
                                    <td>
                                        {file.fileName}
                                    </td>
                                    <td> 
                                        <a href={`http://localhost:3001/api/read-s3-datas/${file.fileName}`}>Click Here to download</a> 
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </Table>
            )}
        </div>
  	);
}

export default UploadFile;

