#!/usr/bin/python3
import unittest
from unittest.mock import MagicMock, patch
from models.base_model import BaseModel
from models.engine.db_storage import DB


class TestDB(unittest.TestCase):

    @patch('models.engine.db_storage.create_engine')
    @patch('models.engine.db_storage.sessionmaker')
    @patch('models.engine.db_storage.scoped_session')
    def setUp(self, mock_scoped_session, mock_sessionmaker, mock_create_engine):
        """Prepare the DB instance and mock the database engine and session."""
        # Mock the database engine creation
        self.mock_engine = mock_create_engine.return_value

        # Mock the sessionmaker to return a MagicMock object
        self.mock_sessionmaker = mock_sessionmaker.return_value = MagicMock()

        # Mock the scoped_session to return a mock session object
        self.mock_session = mock_scoped_session.return_value = MagicMock()

        # Initialize the DB instance with mocked components
        self.db = DB()
        self.db.reload()

    def test_new(self):
        """Test adding a new entity."""
        mock_obj = MagicMock(spec=BaseModel)
        self.db.new(mock_obj)
        self.mock_session.add.assert_called_once_with(mock_obj)

    def test_update(self):
        """Test updating an entity."""
        mock_obj = MagicMock(spec=BaseModel)
        self.db.update(mock_obj, name="Updated Name")
        self.assertTrue(hasattr(mock_obj, 'name'))
        self.assertEqual(mock_obj.name, "Updated Name")

    def test_delete(self):
        """Test deleting an entity."""
        mock_obj = MagicMock(spec=BaseModel)
        self.db.delete(mock_obj)
        self.mock_session.delete.assert_called_once_with(mock_obj)

    def test_save(self):
        """Test saving changes to the database."""
        self.db.save()
        self.mock_session.commit.assert_called_once()

    def test_close(self):
        """Test closing the session."""
        self.db.close()
        self.mock_session.remove.assert_called_once()


if __name__ == '__main__':
    unittest.main()
