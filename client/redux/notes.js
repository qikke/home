const ADD_FOLDER = 'NOTES/ADDFOLDER'
const DEL_FOLDER = 'NOTES/DELFOLDER'
const EDIT_FOLDER = 'NOTES/EDITFOLDER'

export const addFolder = (folder) => ({
    type: ADD_FOLDER,
    folder
})

const reducer = (state={folders: []}, action) => {
    const {id, name} = action
    switch(action.type) {
        case ADD_FOLDER: 
            state.folders.push({})
            return {}
    }
}

const note = [
    {
        name: '',
        id: '',
        content: '',
        folderId: ''
    }
]