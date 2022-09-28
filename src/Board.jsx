import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik";
import React, { useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid/v4";
import NewNavbar from "../src/fixedComponent/new-navbar/newnavbar"
import {NSidebar} from "../src/fixedComponent/new-sidebar/nSidebar"
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { useEffect } from "react";

const itemsFromBackend = [
  {
    id: "1",
    heading_name: "Project Name",
    content: "First tasktasktask task tasktasktask",
  },
  {
    id: " 2",
    heading_name: "Project Name",
    content:
      "Second tasktasktask task tasktasktasktask tasktasktasktasktasktasktask tasktasktask",
  },
  {
    id: " 3",
    heading_name: "Project Name",
    content: "Third tasktasktask task tasktasktask",
  },
  {
    id: " 4",
    heading_name: "Project Name",
    content: "Fourth tasktasktask task tasktasktask",
  },
  {
    id: " 5",
    heading_name: "Project Name",
    content: "Fifth tasktasktask task tasktasktask",
  },
  {
    id: " 6",
    heading_name: "Project Name",
    content: "First tasktasktask task tasktasktask",
  },
  {
    id: " 7",
    heading_name: "Project Name",
    content:
      "Second tasktasktask task tasktasktasktask tasktasktasktasktasktasktask tasktasktask",
  },
  {
    id: " 8",
    heading_name: "Project Name",
    content: "Third tasktasktask task tasktasktask",
  },
  {
    id: " 9",
    heading_name: "Project Name",
    content: "Fourth tasktasktask task tasktasktask",
  },
];

const columnsFromBackend = [
  {
    name: "Requested",
    items: itemsFromBackend,
  },
  {
    name: "To do",
    items: [],
  },
  {
    name: "In Progress",
    items: [],
  },

  {
    name: "Done",
    items: [],
  },
];

///////////////// On kanban change api fetching part///////////////////////////////////////////////////////////

function Board1() {
  const [datas, setdatas] = useState({
    taskName: "",
    Description: "",
    timeEstimation: "",
    sprint: "",
    member: "",
  });
  const [firstimage, setImageOffer] = useState("");
  const [fileimage, setfileimage] = useState("File Upload");
  const [frontimagenames, setfrontimages] = useState();
  const [sprintname, setsprintname] = useState([]);
  const [priority, setpriority] = useState([]);

  const [columns, setColumns] = useState(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    ///////////////if it is droped in another column/////////////////////////
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log("destination", destination);
      console.log("source", sourceItems);

      if (destination.droppableId == 0) {
        console.log("0 api call");
      } else if (destination.droppableId == 1) {
        console.log("1 api call");
        console.log(destItems);
      } else if (destination.droppableId == 2) {
        console.log("2 api call");
      } else {
        console.log("3 api call");
      }

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
    ///////////////if it is droped in same column/////////////////////////
    else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      console.log("else bhitra");
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  const [show, setShow] = useState(false);
  const [ newitem, setnewitem] = useState({});

  const handleimage = (event, allvalues) => {
    setfrontimages(URL.createObjectURL(event.target.files[0]));
    let files = event.target.files[0];
    setImageOffer(files);
  };

  // const getSprint = () => {
  //   httpClient.GET(getallsprint, false, true).then((res) => {
  //     let data = res.data.data.map((value) => {
  //       return {
  //         value: value.id,
  //         label: value.name,
  //       };
  //     });
  //     setsprintname(data);
  //   });
  // };
  const getPriority = () => {
    let data = [
      {
        label: "Top Priority",
        value: 0,
      },
      {
        label: "Semi Priority",
        value: 1,
      },
      {
        label: "Low Priority",
        value: 2,
      },
    ];
    setpriority(data);
  };
  useEffect(() => {
    // getSprint();
    getPriority();
  }, []);

  const handlemouse = (item) => {
    setnewitem(item);
    setdatas({
      taskName: item.heading_name,
    Description: item.content,
    timeEstimation: item.content,
    sprint: item.content,
    member: item.content,
    })
    console.log(item);
  };

  const handleShow = () => {
    setShow(!show);
    setnewitem({});
  };

  return (
    <div className="dashboard-main-body">
      
      <NSidebar/>
      <div className="nav-n-content">
        <NewNavbar />
        <div className="pdm-body2">
          <h2 className="pdf-pform">Project Board</h2>
          <div className="boards-container">
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    className="boards"
                    key={columnId}
                    // onClick={() => console.log(columnId)}
                  >
                    <p className="kanban-column-name">{column.name}</p>
                    <div className="board-content">
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "#e6e6e6	"
                                  : "#f0f0f0",
                                padding: 4,
                                borderRadius: 5,
                                width: 300,
                                minHeight: 700,
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",

                                            backgroundColor: snapshot.isDragging
                                              ? "#9DADBE"
                                              : "#fff",

                                            ...provided.draggableProps.style,
                                          }}
                                          className="tasks"
                                        >
                                          {columnId ==
                                          columnsFromBackend.length - 1 ? (
                                            <i
                                              class="fa-solid fa-check icon-check"
                                              style={{
                                                float: "right",
                                                color: "#8ad812",
                                                position: "relative",
                                                top: "80px",
                                                right: "35px"
                                              }}
                                              
                                            ></i>
                                          ) : null}

                                          <div
                                            className="tasks-div"
                                            onClick={() => {
                                              handleShow();
                                              handlemouse(item);
                                            }}
                                          >
                                  
                                            <span className="task-code">
                                              {item.heading_name}
                                            </span>
                                            <span className="task-date">
                                              2022/09/13
                                            </span>
                                            <p className="task-title">
                                              {item.heading_name}
                                            </p>

                                            <p className="task-des">
                                              {item.content}
                                            </p>
                                          </div>
                                          <Modal
                                              show={show}
                                              onHide={handleShow}
                                            >
                                              <Modal.Header closeButton>
                                                <Modal.Title>
                                                  <span>Id:</span>
                                                  {newitem.id}
                                                </Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                
                                                <div>
                                                    <Formik
                                                    enableReinitialize
                                                    initialValues={datas}
                                                    // validationSchema={
                                                    //   Taskformvalidation
                                                    // }
                                                    onSubmit={async (
                                                      value,
                                                      { resetForm }
                                                    ) => {
                                                      console.log(value);
                                                      let taskvalue = {
                                                        taskName:
                                                          value.taskName,
                                                        Description:
                                                          value.Description,
                                                        sprintId: value.sprint,
                                                        member: value.member,
                                                        taskPriority:
                                                          value.priority,
                                                        timeEstimation:
                                                          value.timeEstimation,
                                                      };
                                                      // httpClient.UPLOADFILE(
                                                      //   "POST",
                                                      //   "api/task/save",
                                                      //   taskvalue,
                                                      //   firstimage
                                                      // );
                                                      resetForm();
                                                    }}
                                                   >
                                                    {({
                                                      errors,
                                                      touched,
                                                      allvalues,
                                                      setFieldValue,
                                                    }) => (
                                                      <Form>
                                                        <div className="modalContent">
                                                          <div className="projectDeatils">
                                                            <a
                                                              href=""
                                                              className="projectHome"
                                                            >
                                                              Project Name
                                                            </a>
                                                            <span>
                                                              {" "}
                                                              / Task Code
                                                            </span>
                                                          </div>

                                                          <div className="taskFields">
                                                            <div>
                                                              <label className="taskLabel">
                                                                Task Name
                                                              </label>
                                                              <Field
                                                                name="taskName"
                                                                class="taskInput"
                                                                placeholder="Task Name"
                                                              ></Field>
                                                              {errors.taskName &&
                                                              touched.taskName ? (
                                                                <div className="error-message">
                                                                  {
                                                                    errors.taskName
                                                                  }
                                                                </div>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              <label className="taskLabel">
                                                                Description
                                                              </label>
                                                              <Field
                                                                style={{
                                                                  resize:
                                                                    "vertical",
                                                                }}
                                                                as="textarea"
                                                                name="Description"
                                                                class="taskInput"
                                                                placeholder="Description"
                                                              ></Field>
                                                              {errors.Description &&
                                                              touched.Description ? (
                                                                <div className="error-message">
                                                                  {
                                                                    errors.Description
                                                                  }
                                                                </div>
                                                              ) : null}
                                                            </div>
                                                            <div>
                                                              <label className="taskLabel">
                                                                Priority
                                                              </label>
                                                              <Select
                                                                // defaultValue={multipleRole}
                                                                name="priority"
                                                                options={
                                                                  priority
                                                                }
                                                                className="taskSelect"
                                                                classNamePrefix="select"
                                                                onChange={(
                                                                  option
                                                                ) => {
                                                                  setFieldValue(
                                                                    "priority",
                                                                    option.value
                                                                  );
                                                                }}
                                                              />
                                                              <ErrorMessage
                                                                name="priority"
                                                                render={(
                                                                  msg
                                                                ) => (
                                                                  <div className="error-message">
                                                                    {msg}
                                                                  </div>
                                                                )}
                                                              ></ErrorMessage>
                                                            </div>
                                                            <div className="twoFields">
                                                              <div>
                                                                <label className="taskLabel">
                                                                  Sprint
                                                                </label>
                                                                <Select
                                                                  // defaultValue={multipleRole}
                                                                  name="sprint"
                                                                  options={
                                                                    sprintname
                                                                  }
                                                                  className="taskSelect"
                                                                  classNamePrefix="select"
                                                                  onChange={(
                                                                    option
                                                                  ) => {
                                                                    setFieldValue(
                                                                      "sprint",
                                                                      option.value
                                                                    );
                                                                  }}
                                                                />
                                                                <ErrorMessage
                                                                  name="sprint"
                                                                  render={(
                                                                    msg
                                                                  ) => (
                                                                    <div className="error-message">
                                                                      {msg}
                                                                    </div>
                                                                  )}
                                                                ></ErrorMessage>
                                                              </div>
                                                              <div>
                                                                <label className="taskLabel">
                                                                  Member
                                                                </label>
                                                                <Select
                                                                  // defaultValue={multipleRole}
                                                                  name="member"
                                                                  options={
                                                                    sprintname
                                                                  }
                                                                  className="taskSelect"
                                                                  classNamePrefix="select"
                                                                  onChange={(
                                                                    option
                                                                  ) => {
                                                                    setFieldValue(
                                                                      "member",
                                                                      option.value
                                                                    );
                                                                  }}
                                                                />

                                                                <ErrorMessage
                                                                  name="member"
                                                                  render={(
                                                                    msg
                                                                  ) => (
                                                                    <div className="error-message">
                                                                      {msg}
                                                                    </div>
                                                                  )}
                                                                ></ErrorMessage>
                                                              </div>
                                                            </div>
                                                            <div className="twoFields">
                                                              <div>
                                                                <label className="taskLabel">
                                                                  Time
                                                                  Estimation
                                                                </label>
                                                                <Field
                                                                  name="timeEstimation"
                                                                  class="taskInput"
                                                                  placeholder="Time"
                                                                ></Field>
                                                                {errors.timeEstimation &&
                                                                touched.timeEstimation ? (
                                                                  <div className="error-message">
                                                                    {
                                                                      errors.timeEstimation
                                                                    }
                                                                  </div>
                                                                ) : null}
                                                              </div>

                                                              <div>
                                                                <label className="taskLabel">
                                                                  File Upload
                                                                </label>
                                                                <div className="upload-btn-wrapper">
                                                                  <button className="ctzn-up-fi-btn taskFileButton">
                                                                    <div>
                                                                      <span className="spa-fi-up-p">
                                                                        {
                                                                          fileimage
                                                                        }
                                                                      </span>
                                                                    </div>
                                                                    <div>
                                                                      {" "}
                                                                      <span>
                                                                        <i className="fas fa-upload"></i>
                                                                      </span>
                                                                    </div>
                                                                  </button>
                                                                  <input
                                                                    type="file"
                                                                    accept="image/jpeg, image/jpg, image/png"
                                                                    name="image"
                                                                    onChange={(
                                                                      event
                                                                    ) => (
                                                                      handleimage(
                                                                        event,
                                                                        allvalues
                                                                      ),
                                                                      setfileimage(
                                                                        event
                                                                          .target
                                                                          .files[0]
                                                                          .name
                                                                      )
                                                                    )}
                                                                  />
                                                                </div>
                                                                {frontimagenames !=
                                                                null ? (
                                                                  <div className="img-frame">
                                                                    <img
                                                                      src={
                                                                        frontimagenames
                                                                      }
                                                                      alt="image"
                                                                    />
                                                                  </div>
                                                                ) : null}

                                                                {errors.fileUpload &&
                                                                touched.fileUpload ? (
                                                                  <div className="error-message">
                                                                    {
                                                                      errors.fileUpload
                                                                    }
                                                                  </div>
                                                                ) : null}
                                                              </div>
                                                            </div>

                                                            <div className="cu-sbutton">
                                                              <Button
                                                              style={{float:"right"}}
                                                                type="button"
                                                                className="save-btn"
                                                                // ref={loadings}
                                                              >
                                                                Update
                                                              </Button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </Form>
                                                    )}
                                                  </Formik>
                                                </div>

                                                {/* <h1>Body Goes Here</h1>
                                                {newitem.content} */}
                                              </Modal.Body>
                                              {/* <Modal.Footer>
                                                <Button
                                                  variant="primary"
                                                  onClick={handleShow}
                                                >
                                                  Close
                                                </Button>
                                              </Modal.Footer> */}
                                            </Modal>

                                          <div>
                                            <button className="priority-btn">
                                              Priority
                                            </button>
                                            <i class="fa fa-paperclip icon-p"></i>
                                            <span className="count-attach">
                                              0
                                            </span>
                                            <img
                                              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                              alt=""
                                              className="member-image"
                                            />
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board1;
