//External Import
import React from "react";


const CommonModal = ({ selectedData,open,cid, onClose, typeData,onUpdate }) => {
 
  return (
    <>
      {/* {(() => {
        switch (typeData) {
          case "category":
            return <AddCategoryModal cid={cid} onUpdate={onUpdate} onClose={onClose} open={open} selectedData={selectedData} />;

          case "user":
            // return <UserModal selectedData={selectedData} onClose={onClose} />;
            return "";
          default:
            return (
              <Box>
                <Typography>No Data Availavle;</Typography>
              </Box>
            );
        }
      })()} */}
    </>
  );
};

export default CommonModal;
