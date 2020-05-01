import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreateMarket } from "modules/modal/create-market";
import { closeModal } from "modules/modal/actions/close-modal";
import { AppState } from "appStore";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { AppStatusState } from "modules/app/store/app-status";

const mapStateToProps = (state: AppState) => ({
  modal: AppStatusState.get().modal,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<void, any, Action>) => ({
  closeModal: () => dispatch(closeModal())
});

// updateModal should pass:
// { type: MODAL_CATEGORIES, categoriesList?, category?, save }
const mergeProps = (sP: any, dP: any, oP: any) => {
  const save = (cat) => sP.modal.save(cat);
  const selectedCategory =  sP.modal.category || "";
  // categoriesList is a dummy data for now, will need to be passed or come
  // from a helper/getter... currently setup to be passed from the updateModal
  // call.
  const categoriesList = sP.modal.categoriesList || ["Politics", "Sports", "Crypto", "Finance", "Other"];
  return ({
    title: "CHOOSE A SUB-CATEGORY",
    categorySelection: {
      categoriesList,
      selectedCategory,
      save
    },
    closeAction: () => {
      dP.closeModal();
    },
    buttons: [
      {
        text: "Save",
        action: () => {
          // this modal constantly saves on edits so we just close the modal
          dP.closeModal();
        }
      },
      {
        text: "Close",
        action: () => {
          dP.closeModal();
          // cancel save and go back to whatever we had
          save(selectedCategory);
        }
      }
    ]
  });
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(CreateMarket),
);
