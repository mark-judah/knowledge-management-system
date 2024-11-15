import { apkIcon, archiveIcon, audioIcon, calendarIcon, csvIcon, documentIcon, ebookIcon, excelIcon, fontIcon, htmlIcon, imageIcon, javaIcon, jsonIcon, mpkgIcon, pdfIcon, powerpointIcon, presentationIcon, spreadsheetIcon, unknownIcon, videoIcon, wordIcon } from "../icons";

const fileTypesIcons = {
        "image": imageIcon,
        "video": videoIcon,
        "archive": archiveIcon,
        "document": documentIcon,
        "audio": audioIcon,
        "unknown": unknownIcon,
        "ebook": ebookIcon,
        "font": fontIcon,
        "spreadsheet": spreadsheetIcon,
        "powerpoint": powerpointIcon,
        "presentation": presentationIcon,
        "word": wordIcon,
        "excel": excelIcon,
        "pdf": pdfIcon,
        "android_installer_package": apkIcon,
        "apple_installer_package": mpkgIcon,
        "json": jsonIcon,
        "java": javaIcon,
        "html": htmlIcon,
        "csv": csvIcon,
        "calendar":calendarIcon
    }



const extensionsMapper = {
        "aac": "audio",
        "abw": "document",
        "apk": "android_installer_package",
        "apng": "image",
        "arc": "archive",
        "avif": "image",
        "avi": "video",
        "azw": "ebook",
        "bmp": "image",
        "bz": "archive",
        "bz2": "archive",
        "cda": "audio",
        "csv": "csv",
        "doc": "word",
        "docx": "word",
        "eot": "font",
        "epub": "ebook",
        "gz": "archive",
        "gif": "image",
        "htm": "html",
        "html": "html",
        "ico": "image",
        "ics": "calendar",
        "jar": "java",
        "jpeg": "image",
        "jpg": "image",
        "json": "json",
        "mid": "audio",
        "midi": "audio",
        "mp3": "audio",
        "mp4": "video",
        "mpeg": "video",
        "mpkg": "apple_installer_package",
        "odp": "presentation",
        "ods": "spreadsheet",
        "odt": "document",
        "oga": "audio",
        "ogv": "video",
        "ogx": "application",
        "opus": "audio",
        "otf": "font",
        "png": "image",
        "pdf": "pdf",
        "ppt": "presentation",
        "pptx": "powerpoint",
        "rar": "archive",
        "rtf": "document",
        "svg": "image",
        "tar": "archive",
        "tif": "image",
        "tiff": "image",
        "ts": "video",
        "ttf": "font",
        "txt": "document",
        "wav": "audio",
        "weba": "audio",
        "webm": "video",
        "webp": "image",
        "woff": "font",
        "woff2": "font",
        "xls": "spreadsheet",
        "xlsx": "spreadsheet",
        "xml": "document",
        "zip": "archive",
        "3gp": "audio",
        "3g2": "video",
        "7z": "archive"
    }

    const getUrl = () => {
        console.log(process.env.REACT_APP_MODE)
        const mode = process.env.REACT_APP_MODE;
        if (mode === 'development') {
            return process.env.REACT_APP_BACKEND_URL_DEV;
        } else {
            return process.env.REACT_APP_BACKEND_URL_PROD;
        }
    }

export {
    fileTypesIcons,
    extensionsMapper,
    getUrl
}