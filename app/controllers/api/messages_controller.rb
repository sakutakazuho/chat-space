class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id] )
    @new_messages = @group.messages.includes(:user).where('id > ?', params[:id])
    respond_to do |format| 
      format.html 
      format.json
    end
  end
end