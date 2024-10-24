import api from '../../utils/axios';
import {
   ADD_NOTES,
   DELETE_NOTES,
   DELETE_NOTE_IMG,
   EDIT_NOTES,
   FETCH_NOTES,
} from '../url';

export const getNotes = async () => {
   try {
      let response = await api.get(FETCH_NOTES);
      return response;
   } catch (error) {
      return error;
   }
};

export const deleteNotesById = async (id) => {
   try {
      let response = await api.patch(DELETE_NOTES + id);
      return response;
   } catch (error) {
      return error;
   }
};

export const editNotesById = async (id, body) => {
   try {
      let response = await api.patch(EDIT_NOTES + id, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const deleteImgById = async (body) => {
   try {
      let response = await api.patch(DELETE_NOTE_IMG, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const addNotes = async (body) => {
   try {
      let response = await api.post(ADD_NOTES, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const editNote = async (body, id) => {
   try {
      let response = await api.patch(EDIT_NOTES + id, body);
      return response;
   } catch (error) {
      return error;
   }
};
