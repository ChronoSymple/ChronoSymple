class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|

    	t.belongs_to :i_module, index: true
    	t.text :data

      t.timestamps
    end
  end
end
