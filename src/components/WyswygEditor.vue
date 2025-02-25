<template>
    <div class="editor" id="editor"></div>
</template>

<script setup>
import { onMounted } from "vue";
import Quill from "quill";
import commonAPI from "@/apis/commonAPI";
import axios from "axios";

defineExpose({ getContent });

const props = defineProps(["content"]);
let quill = null;

onMounted(() => {
    if (!window.Quill) {
        loadScript();
    } else {
        loadEditor();
    }
});

function loadScript() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js";
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    script.onload = () => {
        loadEditor();
    };
}

function loadEditor() {
    quill = new Quill("#editor", {
        placeholder: "내용을 작성해주세요.",
        theme: "snow",
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "underline"],
                [{ color: ["black", "grey", "#558CCF"] }, { background: ["#EEF1F4"] }],
                ["image", "link"],
                ["clean"],
            ],
        },
    });

    if (props.content != null) {
        quill.clipboard.dangerouslyPasteHTML(0, props.content);
    }

    quill.getModule("toolbar").addHandler("image", function () {
        imageHandler();
    });
}

function getContent() {
    return document.getElementById("editor").querySelector(".ql-editor");
}

function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
        const file = input.files[0];

        const formData = new FormData();
        formData.append("img", file);
        try {
            const response = await commonAPI.imageUpload(formData);
            const imgUrl = response.data.imgUrl;
            const range = quill.getSelection();

            quill.insertEmbed(range.index, "image", axios.defaults.baseURL + imgUrl);

            const [leaf] = quill.getLeaf(range.index);
            if (leaf && leaf.domNode && leaf.domNode.tagName === "IMG") {
                leaf.domNode.setAttribute("width", "100%");
            }

            quill.setSelection(range.index + 1);
        } catch (error) {
            console.log(error);
        }
    });
}
</script>

<style scoped>
.editor {
    height: 400px;
}
</style>
