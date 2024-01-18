export default [
  {
    "statements": [
      "CREATE TABLE \"note\" (\n  \"id\" TEXT NOT NULL,\n  \"title\" TEXT NOT NULL,\n  \"content\" TEXT NOT NULL,\n  CONSTRAINT \"note_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.note', 1);",
      "  /* Triggers for table note */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_note_primarykey;",
      "CREATE TRIGGER update_ensure_main_note_primarykey\n  BEFORE UPDATE ON \"main\".\"note\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_note_into_oplog;",
      "CREATE TRIGGER insert_main_note_into_oplog\n   AFTER INSERT ON \"main\".\"note\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.note')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'note', 'INSERT', json_object('id', new.\"id\"), json_object('content', new.\"content\", 'id', new.\"id\", 'title', new.\"title\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_note_into_oplog;",
      "CREATE TRIGGER update_main_note_into_oplog\n   AFTER UPDATE ON \"main\".\"note\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.note')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'note', 'UPDATE', json_object('id', new.\"id\"), json_object('content', new.\"content\", 'id', new.\"id\", 'title', new.\"title\"), json_object('content', old.\"content\", 'id', old.\"id\", 'title', old.\"title\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_note_into_oplog;",
      "CREATE TRIGGER delete_main_note_into_oplog\n   AFTER DELETE ON \"main\".\"note\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.note')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'note', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('content', old.\"content\", 'id', old.\"id\", 'title', old.\"title\"), NULL);\nEND;"
    ],
    "version": "1"
  }
]