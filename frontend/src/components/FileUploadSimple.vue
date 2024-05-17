<template>
<div class="file-upload">
    <div class="file-upload__area">
        <h5>Ещё не доделан</h5>
        <input type="file" name="" id=""
            @change="uploadFile"
            ref="file" />
        <v-btn @click="submitFile">Upload!</v-btn>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "FileUpload",
    data() {
        return {
            isLoading: false,
            uploadReady: true,
            file: {
                name: "",
                size: 0,
                type: "",
                fileExtention: "",
                url: "",
                isImage: false,
                isUploaded: false,
            },
        }
    },

    methods: {
        uploadFile(e) {
            // Check if file is selected
            if (e.target.files && e.target.files[0]) {

                // Get uploaded file
                const file = e.target.files[0],

                // Get file size
                //eslint-disable-next-line no-unused-vars
                fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100,
                
                // Get file extension
                //eslint-disable-next-line no-unused-vars
                fileExtention = file.name.split(".").pop(),
                
                // Get file name
                //eslint-disable-next-line no-unused-vars
                fileName = file.name.split(".").shift(),

                // Check if file is an image
                //eslint-disable-next-line no-unused-vars
                isImage = ["jpg", "jpeg", "png", "gif", "tiff"].includes(fileExtention);
                // Print to console
                // console.log(fileSize, fileExtention, fileNameOnly, isImage);
            }
        },

        submitFile() {
            const formData = new FormData();
            formData.append('file', this.Images);
            const headers = { 'Content-Type': 'multipart/form-data' };
            axios.post(
                '/api/file',
                formData, { headers }
            )
            .then((res) => {
                res.data.files; // binary representation of the file
                res.status; // HTTP status
            });
        }
    }
};
</script>

<style scoped>
.file-upload {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.file-upload .file-upload__area {
    width: 600px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
}
</style>
