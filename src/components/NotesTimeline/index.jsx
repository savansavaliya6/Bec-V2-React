import moment from "moment"
import React from "react"

const NotesTimeline = ({ notes }) => {
  return (
    <>
      <div class="timeline-container">
        {notes && notes?.length > 0 ? (
          notes.map((note, index) => {
            return (
              <ul class="timeline" key={note}>
                <li>
                  <div class="timeline-icon">
                    <a href="javascript:;">&nbsp;</a>
                  </div>
                  <div
                    class="timeline-body"
                    style={{
                      backgroundColor: index % 2 === 0 ? "#aec0cc" : "#d1d1d1",
                    }}
                  >
                    <div class="timeline-header">
                      <span class="username">{note.created_by.name}</span>
                    </div>
                    <span class="date">
                      {moment
                        .tz(`${note.created_at}`, "Africa/Johannesburg")
                        .format("MMM Do YYYY, h:mm A")}
                    </span>
                    <hr />
                    <div class="timeline-content">
                      <p>{note.notes}</p>
                    </div>
                  </div>
                </li>
              </ul>
            )
          })
        ) : (
          <p className="text-center">No data found</p>
        )}
      </div>
    </>
  )
}

export default NotesTimeline
