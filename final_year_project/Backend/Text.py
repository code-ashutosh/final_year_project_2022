# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 21:51:19 2021
@author: win10
"""
from pydantic import BaseModel
# 2. Class which describes Text Input of user
class Text(BaseModel):
    query: str
    lang: str
    sessionId: str
    